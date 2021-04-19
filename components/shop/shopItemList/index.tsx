import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import styles from '@/styles/ShopList.module.scss'
import Link from 'next/link'

type ListProps = {
	list: Array<{ id: number; image_link: string; name: string; category: string; product_type: string; price: number }>
}

export default function ShopItemList({ list }: ListProps) {
	return (
		<Grid columns={5}>
			<Grid.Row>
				{list.map(prdt => (
					<Grid.Column key={prdt.id}>
						<div style={{ padding: '40px 80px 80px 80px' }}>
							<Link href={'/shop/shopdetail/[id]'} as={`/shop/shopdetail/${prdt.id}`}>
								<a>
									<div className={styles.wrap}>
										<Image src={prdt.image_link} className={styles.img_item}></Image>
										<strong className={styles.tit_name}>{prdt.name}</strong>
										<span className={styles.txt_info}>
											{prdt.category} {prdt.product_type}
										</span>
										<strong className={styles.num_price}>${prdt.price}</strong>
									</div>
								</a>
							</Link>
						</div>
					</Grid.Column>
				))}
			</Grid.Row>
		</Grid>
	)
}
