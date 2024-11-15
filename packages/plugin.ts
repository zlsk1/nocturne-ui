import type { Plugin } from 'vue'
import { NLoading } from '@/components/loading'
import { NMessage } from '@/components/message'
import { NNotification } from '@/components/notification'

export default [NLoading, NMessage, NNotification] as Plugin[]
