
import { DatabaseService } from './database.service'

export interface NotificationLog {
  id: string
  tenant_id: string
  type: 'email' | 'push' | 'sms'
  notification_type: string
  data: Record<string, any>
  sent_at: string
}

export class NotificationService {
  private dbService: DatabaseService
  
  constructor(dbService: DatabaseService) {
    this.dbService = dbService
  }
  
  async sendNotification(
    tenantId: string,
    notificationType: string,
    data: Record<string, any>,
    type: 'email' | 'push' | 'sms' = 'email'
  ): Promise<void> {
    try {
      // Log notification
      await this.dbService.saveTenantData<NotificationLog>('notification_logs', tenantId, {
        type,
        notification_type: notificationType,
        data,
        sent_at: new Date().toISOString()
      })
      
      // Here you would implement actual notification sending
      // For now, just console.log
      console.log(`Notification sent to tenant ${tenantId}:`, {
        type,
        notificationType,
        data
      })
      
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }
  
  async getNotificationHistory(
    tenantId: string,
    options: {
      type?: 'email' | 'push' | 'sms'
      notification_type?: string
      limit?: number
    } = {}
  ): Promise<NotificationLog[]> {
    try {
      const query: Record<string, any> = {}
      
      if (options.type) query.type = options.type
      if (options.notification_type) query.notification_type = options.notification_type
      
      return await this.dbService.getTenantData<NotificationLog>('notification_logs', tenantId, query)
    } catch (error) {
      console.error('Error getting notification history:', error)
      return []
    }
  }
}
