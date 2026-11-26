import supabase from "./supabase";

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
