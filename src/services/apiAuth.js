import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  //console.log(data);
  return data;
}

//we need this function because is the user reload the page, we want to get the current authenticated user
// for testing purposes, to retry delete the local storage session, browser-application storage might need to be cleared, this will be irrelevant after implementing LogOut

export async function getCurrentUser() {
  //this will get , if there is one, session for local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  //if there is get the user from supabase again, we can get it from local storage but its more secure que get it from supabase again
  const { data, error } = await supabase.auth.getUser();
  //console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //*1- Update the password OR the fullName
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //*2- Upload the avatar image
  //in the supabase create a storage bucket for avatars if it doesn't exist, and check the policies
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }

  //*3- Update the avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) {
    throw new Error(updateError.message);
  }
  return updatedUser;
}
