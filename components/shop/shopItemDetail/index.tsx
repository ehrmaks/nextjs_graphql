import React from 'react'
import styles from '@/styles/ShopDetail.module.scss'
import { Button, Header, Image } from 'semantic-ui-react'

interface ItemProps {
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

export default function ShopItemDetail({ item }: ItemProps) {
	const { image_link, name, price, description, category, product_type } = item
	return (
		<>
			<div className={styles.wrap}>
				<div className={styles.img_item}>
					<Image src={image_link} alt={name} />
				</div>
				<div className={styles.info_item}>
					<strong className={styles.tit_item}>{name}</strong>
					<strong className={styles.num_price}>${price}</strong>
					<span className={styles.txt_info}>
						{category ? `${category}/` : ''}
						{product_type}
					</span>
					<Button color="orange">구매하기</Button>
				</div>
			</div>
			<div className={styles.header}>
				<Header as="h3">Description</Header>
				<div className={styles.desc}>
					<p>{description}</p>
				</div>
			</div>
		</>
	)
}
