import { OrderOptions } from '@/constants/enums'

export interface GetPostApi {
	end: number,
	start: number
	order: OrderOptions
	limitSize: number
}