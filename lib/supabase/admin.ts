import { createClient } from "@supabase/supabase-js";
export function createSupabaseAdmin(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false}})}
export const ADMIN_EMAILS=["contato@nexawi.com.br","tinewest3@gmail.com","jamesnebou34@gmail.com"];
export async function requireAdmin(){const {createSupabaseServer}=await import("./server");const supabase=await createSupabaseServer();const{data:{user}}=await supabase.auth.getUser();return user&&ADMIN_EMAILS.includes((user.email??"").toLowerCase())?user:null}
