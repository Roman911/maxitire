import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BaseDataProps, CarModelProps, KitTyreSize, KitDiskSize, ManufModels } from '../models/baseData';
import type { SettingsProps } from '../models/settings';
import type { ProductsProps } from '../models/products';
import type { ProductProps } from '../models/product';
import type { AkumProps } from '../models/akumData';
import type { OrdersParamProps } from '../models/ordersParam';
import type { AliasAll } from '../models/alias';

export const baseDataAPI = createApi({
	reducerPath: 'dataAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_APP_BASE_URL,
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Origin': import.meta.env.VITE_APP_ACCESS_ORIGIN,
		},
	}),
	tagTypes: ['baseDataAPI', 'Product'],
	endpoints: (build) => ({
		fetchSettings: build.query<SettingsProps, string>({
			query: () => ({
				url: `/baseData/settings`,
			}),
		}),
		fetchBaseData: build.query<BaseDataProps, string>({
			query: () => ({
				url: '/baseData',
			}),
		}),
		fildterData: build.query<BaseDataProps, string>({
			query: (id) => ({
				url: `/api/FildterData${id}`,
			}),
		}),
		fetchAutoModel: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: `/baseData/getAutoBrandModel/${id}`,
			}),
		}),
		fetchAutoYear: build.query<number[], string>({
			query: (id) => ({
				url: `/baseData/getAutoBrandModelYear/${id}`,
			}),
		}),
		fetchAutoModelKit: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: `/baseData/getAutoBrandModelKit/${id}`,
			}),
		}),
		fetchKitTyreSize: build.query<KitTyreSize[], string>({
			query: (id) => ({
				url: `/baseData/getKitTyreSize/${id}`,
			}),
		}),
		fetchKitDiskSize: build.query<KitDiskSize[], string>({
			query: (id) => ({
				url: `/baseData/getKitDiskSize/${id}`,
			}),
		}),
		fetchManufModels: build.query<ManufModels[], string>({
			query: (id) => ({
				url: `/api/getManufModels/${id}`,
			}),
		}),
		fetchStatiAliasAll: build.query<AliasAll, string>({
			query: () => ({
				url: `/baseData/StatiAlias`,
			}),
		}),
		fetchStatiAlias: build.query({
			query: (id) => ({
				url: `/baseData/StatiAlias/${id}`,
			}),
		}),
		fetchProducts: build.query<ProductsProps | undefined, {id: string, start?: number, length?: number}>({
			query: ({ id, start = 0, length = 8 }) => ({
				url: `/api/getProducts${id}`,
				method: 'POST',
				body: {
					start,
					length
				}
			}),
		}),
		fetchProduct: build.query<ProductProps, string>({
			query: (id) => ({
				url: `/api/getProduct/${id}`,
			}),
			providesTags: () => ['Product']
		}),
		fetchDataAkum: build.query<AkumProps, string>({
			query: () => ({
				url: `/api/baseDataAkum`,
			}),
		}),
		fetchBrand: build.query({
			query: (id) => ({
				url: `/api/brand/${id}`,
			}),
		}),
		fetchModel: build.query({
			query: (id) => ({
				url: `/api/model/${id}`,
			}),
		}),
		createComment: build.mutation({
			query: (comment) => ({
				url: '/api/addReview',
				method: 'POST',
				body: comment,
			}),
			invalidatesTags: ['Product'],
		}),
		fetchOrdersParam: build.query<OrdersParamProps, string>({
			query: () => ({
				url: `/api/getOrdersParam`,
			}),
		}),
		fetchNpSearch: build.query({
			query: (name) => ({
				url: `/api/np/search`,
				method: 'POST',
				body: {
					name: name
				}
			}),
		}),
		fetchNpWarehouses: build.query({
			query: (ref) => ({
				url: `/api/np/warehouses/${ref}`,
			}),
		}),
		fetchNpDocumentPrice: build.query({
			query: (params) => ({
				url: `/api/np/getDocumentPrice`,
				method: 'POST',
				body: params,
			}),
		}),
		createOrder: build.mutation({
			query: (data) => ({
				url: '/api/addOrder',
				method: 'POST',
				body: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			}),
		}),
		createCallback: build.mutation({
			query: (data) => ({
				url: '/api/addCallback',
				method: 'POST',
				body: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			}),
		}),
		createAddAsk: build.mutation({
			query: (data) => ({
				url: '/api/addAsk',
				method: 'POST',
				body: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			}),
		}),
	}),
});
