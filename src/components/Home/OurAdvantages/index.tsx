import { FC } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '../../../hooks';

import { Title } from '../../Lib';

import icon1 from '../../../assets/our_advantages/item-oa-1.svg';
import icon2 from '../../../assets/our_advantages/item-oa-2.svg';
import icon3 from '../../../assets/our_advantages/item-oa-3.svg';
import icon4 from '../../../assets/our_advantages/item-oa-4.svg';

interface OurAdvantagesProps {
	size?: 'small'
}

export const OurAdvantages: FC<OurAdvantagesProps> = ({ size }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <div className={ classNames('bg-white', { 'rounded-2xl mt-5 px-5 py-7': size, 'mt-24 py-4 px-4 lg:py-24 lg:px-28': !size }) }>
		<Title title='our advantages' className={ size ? 'font-bold' : 'my-5 text-3xl md:text-4xl font-bold' } />
		<div className={ classNames('grid', { 'mt-8 grid-cols-1 gap-y-5 text-sm leading-5': size, 'mt:10 md:mt-14 grid-cols-1 lg:grid-cols-2 gap-y-7 md:gap-y-12 text-xl md:text-2xl leading-7 md:leading-9': !size }) }>
			<div className='flex items-center'>
				<img className={ classNames({ 'mr-4 w-10 h-10': size, 'w-20 md:w-auto mr-5 md:mr-6': !size }) } src={icon1} alt=""/>
				{lang === 'ua' ?
					<h4>На шинному ринку з <span className='font-bold'>2008 року</span></h4> :
					<h4>На шинном рынке с <span className='font-bold'>2008 года</span></h4>}
			</div>
			<div className='flex items-center'>
				<img className={ classNames({ 'mr-4 w-10 h-10': size, 'w-20 md:w-auto mr-5 md:mr-6': !size }) } src={icon2} alt=""/>
				{lang === 'ua' ?
					<h4><span className='font-bold'>Повний</span> цикл обслуговування в Києві (замовлення, доставка, установка, зберігання)</h4> :
					<h4><span className='font-bold'>Полный</span> цикл обслуживания в Киеве (заказ, доставка, установка, хранение)</h4>}
			</div>
			<div className='flex items-center'>
				<img className={ classNames({ 'mr-4 w-10 h-10': size, 'w-20 md:w-auto mr-5 md:mr-6': !size }) } src={icon3} alt=""/>
				{lang === 'ua' ?
					<h4>Зареєстрована торгова марка <span className='font-bold'>LuxShina TM</span></h4> :
					<h4>Зарегистрированная торговая марка <span className='font-bold'>LuxShina TM</span></h4>}
			</div>
			<div className='flex items-center'>
				<img className={ classNames({ 'mr-4 w-10 h-10': size, 'w-20 md:w-auto mr-5 md:mr-6': !size }) } src={icon4} alt=""/>
				{lang === 'ua' ?
					<h4>Швидка доставка по Україні <span className='font-bold'>(Нова пошта, Meest)</span></h4> :
					<h4>Быстрая доставка по Украине <span className='font-bold'>(Новая почта, Meest)</span></h4>}
			</div>
		</div>
	</div>
}
