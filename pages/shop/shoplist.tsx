import React from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'
import Meta from '@/components/common/Meta'
import ShopItemList from '@/components/shop/shopItemList'
import { Divider, Header } from 'semantic-ui-react'

type ListType = {
	list: Array<{
		id: number
		image_link: string
		name: string
		category: string
		product_type: string
		price: number
	}>
}

const Shop = ({ list }: ListType) => {
	return (
		<div>
			<Meta title="SHOP | 죽밥이" desc="쇼핑을 즐기세요!"></Meta>
			<Header as="h3" style={{ padding: '0px 0px 20px 20px' }}>
				베스트 상품
			</Header>
			<Divider></Divider>
			<ShopItemList list={list.slice(0, 10)}></ShopItemList>
			<Header as="h3" style={{ padding: '40px 0px 20px 20px' }}>
				신상품
			</Header>
			<Divider></Divider>
			<ShopItemList list={list.slice(10)}></ShopItemList>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const apiUrl = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`
	const res = await axios.get(apiUrl)

	return {
		props: {
			list: res.data as ListType,
		},
	}
}

export default Shop
