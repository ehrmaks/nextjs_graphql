import Meta from '@/components/common/Meta'
import axios from 'axios'
import { GetStaticProps } from 'next'
import React from 'react'
import ShopItemDetail from '@components/shop/shopItemDetail'
import { useRouter } from 'next/router'
import { Loader } from 'semantic-ui-react'

interface ItemType {
	item: {
		api_featured_image: string
		brand: string
		category: string
		created_at: string
		description: string
		id: number
		image_link: string
		name: string
		price: string
		product_api_url: string
		product_colors: []
		product_link: string
		product_type: string
		rating: number
		tag_list: []
		updated_at: string
		website_link: string
	}
}

export default function ShopDetail({ item }: ItemType) {
	const { isFallback } = useRouter()
	if (isFallback) {
		return (
			<div style={{ padding: '150px 0' }}>
				<Loader inline="centered" active>
					잠시만 기다려주세요...
				</Loader>
			</div>
		)
	}
	return (
		<div>
			<Meta title="상품 상세보기 | 죽밥이" desc="상품 상세 화면입니다."></Meta>
			{item && <ShopItemDetail item={item}></ShopItemDetail>}
		</div>
	)
}

export const getStaticPaths = async () => {
	const apiUrl = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`
	const products = await axios.get(apiUrl)

	return {
		paths: products.data.slice(0, 10).map(prdt => ({
			params: {
				id: prdt.id.toString(),
			},
		})),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps = async context => {
	const id = context.params.id
	const apiUrl = `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
	const res = await axios.get(apiUrl)

	return {
		props: {
			item: res.data as ItemType,
		},
	}
}
