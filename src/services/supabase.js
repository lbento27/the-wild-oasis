import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://uvpmxsfrgstonudrdzzr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cG14c2ZyZ3N0b251ZHJkenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2NDg5MjksImV4cCI6MjEwOTIyNDkyOX0.XPTxagjgBFxuktkk3N5C3-h9xeKVDNQ566TsXBBJVjE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
