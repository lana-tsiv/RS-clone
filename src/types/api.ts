import { OrderOptions } from '@/constants/enums'
import { OrderByDirection } from 'firebase/firestore'

export interface GetPostApi {
	end: number,
	start: number
	sortFieldName: OrderOptions,
	sortDirection: OrderByDirection,
	limitSize: number
	searchValue: string
}
