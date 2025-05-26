export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_insights: {
        Row: {
          action_text: string | null
          created_at: string
          description: string
          id: string
          insight_type: string
          is_read: boolean | null
          priority: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_text?: string | null
          created_at?: string
          description: string
          id?: string
          insight_type: string
          is_read?: boolean | null
          priority?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_text?: string | null
          created_at?: string
          description?: string
          id?: string
          insight_type?: string
          is_read?: boolean | null
          priority?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      alert_history: {
        Row: {
          alert_id: string | null
          id: string
          notification_sent: boolean | null
          triggered_at: string | null
          triggered_value: number | null
        }
        Insert: {
          alert_id?: string | null
          id?: string
          notification_sent?: boolean | null
          triggered_at?: string | null
          triggered_value?: number | null
        }
        Update: {
          alert_id?: string | null
          id?: string
          notification_sent?: boolean | null
          triggered_at?: string | null
          triggered_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_history_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          condition: string
          created_at: string | null
          id: string
          is_active: boolean | null
          last_triggered: string | null
          product_id: string | null
          threshold: number | null
          user_id: string | null
        }
        Insert: {
          alert_type: string
          condition: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          product_id?: string | null
          threshold?: number | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          condition?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          product_id?: string | null
          threshold?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          created_at: string
          id: string
          name: string
          status: string | null
          target_segment_id: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          status?: string | null
          target_segment_id?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          status?: string | null
          target_segment_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_target_segment_id_fkey"
            columns: ["target_segment_id"]
            isOneToOne: false
            referencedRelation: "customer_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
          trendyol_id: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
          trendyol_id: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          trendyol_id?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_performance: {
        Row: {
          channel: string
          conversion_rate: number | null
          created_at: string
          id: string
          revenue: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          channel: string
          conversion_rate?: number | null
          created_at?: string
          id?: string
          revenue?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: string
          conversion_rate?: number | null
          created_at?: string
          id?: string
          revenue?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customer_journey_steps: {
        Row: {
          color: string | null
          created_at: string
          icon_name: string | null
          id: string
          step_count: number | null
          step_name: string
          step_order: number
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon_name?: string | null
          id?: string
          step_count?: number | null
          step_name: string
          step_order: number
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon_name?: string | null
          id?: string
          step_count?: number | null
          step_name?: string
          step_order?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customer_segments: {
        Row: {
          color: string | null
          conversion_rate: number | null
          created_at: string
          customer_count: number | null
          description: string | null
          id: string
          name: string
          revenue_impact: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          conversion_rate?: number | null
          created_at?: string
          customer_count?: number | null
          description?: string | null
          id?: string
          name: string
          revenue_impact?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          conversion_rate?: number | null
          created_at?: string
          customer_count?: number | null
          description?: string | null
          id?: string
          name?: string
          revenue_impact?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace_integrations: {
        Row: {
          api_key: string | null
          created_at: string
          id: string
          is_active: boolean | null
          last_sync: string | null
          marketplace_name: string
          secret_key: string | null
          store_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          marketplace_name: string
          secret_key?: string | null
          store_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          marketplace_name?: string
          secret_key?: string | null
          store_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      metrics: {
        Row: {
          change_percentage: number | null
          change_type: string | null
          created_at: string
          id: string
          metric_name: string
          metric_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          change_percentage?: number | null
          change_type?: string | null
          created_at?: string
          id?: string
          metric_name: string
          metric_value: string
          updated_at?: string
          user_id: string
        }
        Update: {
          change_percentage?: number | null
          change_type?: string | null
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price_monthly: number
          price_yearly: number
          product_limit: number
          update_frequency: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price_monthly: number
          price_yearly: number
          product_limit: number
          update_frequency?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_monthly?: number
          price_yearly?: number
          product_limit?: number
          update_frequency?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_data: {
        Row: {
          discount_percentage: number | null
          id: string
          previous_price: number | null
          price: number | null
          product_id: string | null
          rating: number | null
          review_count: number | null
          stock_status: string | null
          timestamp: string | null
        }
        Insert: {
          discount_percentage?: number | null
          id?: string
          previous_price?: number | null
          price?: number | null
          product_id?: string | null
          rating?: number | null
          review_count?: number | null
          stock_status?: string | null
          timestamp?: string | null
        }
        Update: {
          discount_percentage?: number | null
          id?: string
          previous_price?: number | null
          price?: number | null
          product_id?: string | null
          rating?: number | null
          review_count?: number | null
          stock_status?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_data_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_updated: string | null
          name: string
          seller: string | null
          trendyol_id: string
          url: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          name: string
          seller?: string | null
          trendyol_id: string
          url: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          name?: string
          seller?: string | null
          trendyol_id?: string
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          industry: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      report_history: {
        Row: {
          delivery_status: string | null
          file_path: string | null
          generated_at: string | null
          id: string
          report_id: string | null
        }
        Insert: {
          delivery_status?: string | null
          file_path?: string | null
          generated_at?: string | null
          id?: string
          report_id?: string | null
        }
        Update: {
          delivery_status?: string | null
          file_path?: string | null
          generated_at?: string | null
          id?: string
          report_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_history_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_generated: string | null
          name: string
          parameters: Json | null
          report_type: string
          schedule: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_generated?: string | null
          name: string
          parameters?: Json | null
          report_type: string
          schedule?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_generated?: string | null
          name?: string
          parameters?: Json | null
          report_type?: string
          schedule?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          rating: number | null
          review_date: string | null
          review_text: string | null
          sentiment: string | null
          sentiment_score: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number | null
          review_date?: string | null
          review_text?: string | null
          sentiment?: string | null
          sentiment_score?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number | null
          review_date?: string | null
          review_text?: string | null
          sentiment?: string | null
          sentiment_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          end_date: string | null
          id: string
          is_trial: boolean | null
          payment_method: string | null
          payment_status: string | null
          plan_id: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_trial?: boolean | null
          payment_method?: string | null
          payment_status?: string | null
          plan_id?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_trial?: boolean | null
          payment_method?: string | null
          payment_status?: string | null
          plan_id?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          invited_at: string | null
          joined_at: string | null
          member_email: string
          role: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          member_email: string
          role?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          member_email?: string
          role?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          email_alerts: boolean | null
          id: string
          push_alerts: boolean | null
          sms_alerts: boolean | null
          system_notifications: boolean | null
          updated_at: string | null
          user_id: string | null
          weekly_summary: boolean | null
        }
        Insert: {
          created_at?: string | null
          email_alerts?: boolean | null
          id?: string
          push_alerts?: boolean | null
          sms_alerts?: boolean | null
          system_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          weekly_summary?: boolean | null
        }
        Update: {
          created_at?: string | null
          email_alerts?: boolean | null
          id?: string
          push_alerts?: boolean | null
          sms_alerts?: boolean | null
          system_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          weekly_summary?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
