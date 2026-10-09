export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      article_claims: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          story: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          story?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          story?: string | null
        }
        Relationships: []
      }
      community_bookmarks: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_badge: string
          author_id: string
          author_name: string
          body: string
          book_key: string | null
          category: string
          created_at: string
          hidden: boolean
          id: string
          like_count: number
          pinned: boolean
          reply_count: number
          title: string
          updated_at: string
        }
        Insert: {
          author_badge?: string
          author_id: string
          author_name: string
          body: string
          book_key?: string | null
          category: string
          created_at?: string
          hidden?: boolean
          id?: string
          like_count?: number
          pinned?: boolean
          reply_count?: number
          title: string
          updated_at?: string
        }
        Update: {
          author_badge?: string
          author_id?: string
          author_name?: string
          body?: string
          book_key?: string | null
          category?: string
          created_at?: string
          hidden?: boolean
          id?: string
          like_count?: number
          pinned?: boolean
          reply_count?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_replies: {
        Row: {
          author_badge: string
          author_id: string
          author_name: string
          body: string
          created_at: string
          hidden: boolean
          id: string
          post_id: string
        }
        Insert: {
          author_badge?: string
          author_id: string
          author_name: string
          body: string
          created_at?: string
          hidden?: boolean
          id?: string
          post_id: string
        }
        Update: {
          author_badge?: string
          author_id?: string
          author_name?: string
          body?: string
          created_at?: string
          hidden?: boolean
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_reports: {
        Row: {
          created_at: string
          id: string
          post_id: string
          reason: string
          reporter_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          reason: string
          reporter_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          reason?: string
          reporter_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      critique_profiles: {
        Row: {
          bio: string | null
          created_at: string
          display_name: string
          experience: string
          forms: string[]
          genres: string[]
          id: string
          looking_for: string | null
          open_to_requests: boolean
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_name: string
          experience?: string
          forms?: string[]
          genres?: string[]
          id?: string
          looking_for?: string | null
          open_to_requests?: boolean
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_name?: string
          experience?: string
          forms?: string[]
          genres?: string[]
          id?: string
          looking_for?: string | null
          open_to_requests?: boolean
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      critique_requests: {
        Row: {
          created_at: string
          id: string
          message: string
          project_title: string
          recipient_id: string
          reported: boolean
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          project_title: string
          recipient_id: string
          reported?: boolean
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          project_title?: string
          recipient_id?: string
          reported?: boolean
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      desk_items: {
        Row: {
          category: string
          created_at: string
          id: string
          notes: string | null
          official_deadline: string | null
          opportunity_key: string
          response_notes: string | null
          status: string
          submitted_on: string | null
          target_date: string | null
          title: string
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          notes?: string | null
          official_deadline?: string | null
          opportunity_key: string
          response_notes?: string | null
          status?: string
          submitted_on?: string | null
          target_date?: string | null
          title: string
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          notes?: string | null
          official_deadline?: string | null
          opportunity_key?: string
          response_notes?: string | null
          status?: string
          submitted_on?: string | null
          target_date?: string | null
          title?: string
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      event_rsvps: {
        Row: {
          created_at: string
          event_key: string
          event_title: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_key: string
          event_title: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_key?: string
          event_title?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          admin_notes: string | null
          cancel_requested_at: string | null
          contact_name: string | null
          created_at: string
          expires_on: string | null
          id: string
          payment_reference: string | null
          plan: string
          referral_code: string | null
          started_on: string | null
          status: string
          terms_version: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          cancel_requested_at?: string | null
          contact_name?: string | null
          created_at?: string
          expires_on?: string | null
          id?: string
          payment_reference?: string | null
          plan?: string
          referral_code?: string | null
          started_on?: string | null
          status?: string
          terms_version?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          cancel_requested_at?: string | null
          contact_name?: string | null
          created_at?: string
          expires_on?: string | null
          id?: string
          payment_reference?: string | null
          plan?: string
          referral_code?: string | null
          started_on?: string | null
          status?: string
          terms_version?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pitch_deck_requests: {
        Row: {
          company: string | null
          created_at: string
          id: string
          message: string
          owner_id: string
          owner_reply: string | null
          pitch_id: string
          requester_id: string
          requester_name: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          id?: string
          message: string
          owner_id: string
          owner_reply?: string | null
          pitch_id: string
          requester_id: string
          requester_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          id?: string
          message?: string
          owner_id?: string
          owner_reply?: string | null
          pitch_id?: string
          requester_id?: string
          requester_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pitch_deck_requests_pitch_id_fkey"
            columns: ["pitch_id"]
            isOneToOne: false
            referencedRelation: "pitches"
            referencedColumns: ["id"]
          },
        ]
      }
      pitches: {
        Row: {
          created_at: string
          format: string
          genre: string
          id: string
          logline: string
          published: boolean
          rights: string | null
          synopsis: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          format?: string
          genre: string
          id?: string
          logline: string
          published?: boolean
          rights?: string | null
          synopsis?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          format?: string
          genre?: string
          id?: string
          logline?: string
          published?: boolean
          rights?: string | null
          synopsis?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      refund_requests: {
        Row: {
          created_at: string
          decision_notes: string | null
          id: string
          membership_id: string | null
          reason: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          decision_notes?: string | null
          id?: string
          membership_id?: string | null
          reason: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          decision_notes?: string | null
          id?: string
          membership_id?: string | null
          reason?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refund_requests_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "memberships"
            referencedColumns: ["id"]
          },
        ]
      }
      spotlight_submissions: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          full_name: string
          genre: string
          id: string
          project_title: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          full_name: string
          genre: string
          id?: string
          project_title: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          full_name?: string
          genre?: string
          id?: string
          project_title?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_applications: {
        Row: {
          admin_notes: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          motivation: string
          phone: string | null
          referral_code: string | null
          role_interest: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          motivation: string
          phone?: string | null
          referral_code?: string | null
          role_interest: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          motivation?: string
          phone?: string | null
          referral_code?: string | null
          role_interest?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          id: string
          member_name: string
          portrait_url: string | null
          profile_url: string | null
          quote: string
          specialty: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          member_name: string
          portrait_url?: string | null
          profile_url?: string | null
          quote: string
          specialty?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          member_name?: string
          portrait_url?: string | null
          profile_url?: string | null
          quote?: string
          specialty?: string | null
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weekly_spotlights: {
        Row: {
          created_at: string
          creator_name: string
          description: string
          id: string
          image_url: string | null
          kind: string
          link_url: string | null
          specialty: string | null
          status: string
          title: string
          week_start: string
        }
        Insert: {
          created_at?: string
          creator_name: string
          description: string
          id?: string
          image_url?: string | null
          kind: string
          link_url?: string | null
          specialty?: string | null
          status?: string
          title: string
          week_start: string
        }
        Update: {
          created_at?: string
          creator_name?: string
          description?: string
          id?: string
          image_url?: string | null
          kind?: string
          link_url?: string | null
          specialty?: string | null
          status?: string
          title?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_set_role: {
        Args: {
          _email: string
          _grant: boolean
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: undefined
      }
      community_member_total: { Args: never; Returns: number }
      community_post_total: { Args: never; Returns: number }
      critique_contact: { Args: { _request_id: string }; Returns: string }
      decide_team_application: {
        Args: { _id: string; _status: string }
        Returns: string
      }
      deck_request_contact: { Args: { _request_id: string }; Returns: string }
      has_member_access: { Args: { _uid: string }; Returns: boolean }
      has_pro: { Args: { _uid: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _uid: string }; Returns: boolean }
      request_membership_cancellation: {
        Args: { _id: string }
        Returns: undefined
      }
      validate_referral_code: { Args: { _code: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "member" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member", "moderator"],
    },
  },
} as const
