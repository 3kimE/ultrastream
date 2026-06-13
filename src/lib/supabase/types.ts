export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          whatsapp: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          whatsapp?: string | null;
        };
        Update: {
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          whatsapp?: string | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string | null;
          plan_id: string;
          plan_name: string;
          status: "pending" | "active" | "expired" | "cancelled";
          stripe_customer_id: string | null;
          stripe_session_id: string | null;
          amount: number;
          currency: string;
          starts_at: string | null;
          expires_at: string | null;
          m3u_url: string | null;
          xtream_username: string | null;
          xtream_password: string | null;
          xtream_host: string | null;
          connections: number;
          created_at: string;
        };
        Insert: {
          user_id?: string | null;
          plan_id: string;
          plan_name: string;
          status?: "pending" | "active" | "expired" | "cancelled";
          stripe_customer_id?: string | null;
          stripe_session_id?: string | null;
          amount: number;
          currency?: string;
          starts_at?: string | null;
          expires_at?: string | null;
          m3u_url?: string | null;
          xtream_username?: string | null;
          xtream_password?: string | null;
          xtream_host?: string | null;
          connections?: number;
        };
        Update: {
          user_id?: string | null;
          plan_id?: string;
          plan_name?: string;
          status?: "pending" | "active" | "expired" | "cancelled";
          stripe_customer_id?: string | null;
          stripe_session_id?: string | null;
          amount?: number;
          currency?: string;
          starts_at?: string | null;
          expires_at?: string | null;
          m3u_url?: string | null;
          xtream_username?: string | null;
          xtream_password?: string | null;
          xtream_host?: string | null;
          connections?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          plan_id: string;
          plan_name: string;
          amount: number;
          currency: string;
          stripe_session_id: string | null;
          payment_method: string;
          status: "pending" | "completed" | "failed" | "refunded";
          whatsapp: string | null;
          created_at: string;
        };
        Insert: {
          user_id?: string | null;
          email: string;
          plan_id: string;
          plan_name: string;
          amount: number;
          currency?: string;
          stripe_session_id?: string | null;
          payment_method?: string;
          status?: "pending" | "completed" | "failed" | "refunded";
          whatsapp?: string | null;
        };
        Update: {
          user_id?: string | null;
          email?: string;
          plan_id?: string;
          plan_name?: string;
          amount?: number;
          currency?: string;
          stripe_session_id?: string | null;
          payment_method?: string;
          status?: "pending" | "completed" | "failed" | "refunded";
          whatsapp?: string | null;
        };
      };
      trials: {
        Row: {
          id: string;
          email: string;
          contact: string;
          device: string;
          connections: string;
          status: "pending" | "active" | "expired";
          created_at: string;
        };
        Insert: {
          email: string;
          contact: string;
          device: string;
          connections: string;
          status?: "pending" | "active" | "expired";
        };
        Update: {
          email?: string;
          contact?: string;
          device?: string;
          connections?: string;
          status?: "pending" | "active" | "expired";
        };
      };
    };
  };
}
