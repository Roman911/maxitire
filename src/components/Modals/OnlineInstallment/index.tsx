import monoBank from '../../../assets/mono_bank.png';
import payLater from '../../../assets/pay_later.png';
import privateBank from '../../../assets/private_bank.png';
import senseBank from '../../../assets/sense_bank.png';

export const OnlineInstallment = () => {
	return <div className='bg-white p-14 divide-y divide-[#D8D8D9]'>
		<div>
			<img src={senseBank} alt=""/>
			<h3 className='mt-4 text-xl font-bold'>
				Кредит в Сенс Банк
			</h3>
			<p className='mt-6 mb-8 leading-7'>
				Lorem ipsum dolor sit amet consectetur. Elementum ultrices consequat aenean tellus nibh tempor eget nibh ante.
				Porttitor nullam vitae amet sagittis donec eget mi. Nisi tellus ac in nunc duis porttitor sagittis. Diam
				suscipit diam eget in nunc ultricies enim auctor.
			</p>
		</div>
		<div className='pt-7'>
			<img src={payLater} alt=""/>
			<h3 className='mt-4 text-xl font-bold'>
				Розстрочка від системи «Плати пізніше»
			</h3>
			<p className='mt-6 mb-8 leading-7'>
				Lorem ipsum dolor sit amet consectetur. Elementum ultrices consequat aenean tellus nibh tempor eget nibh ante.
				Porttitor nullam vitae amet sagittis donec eget mi. Nisi tellus ac in nunc duis porttitor sagittis. Diam
				suscipit diam eget in nunc ultricies enim auctor.
			</p>
		</div>
		<div className='pt-7'>
			<img src={privateBank} alt=""/>
			<h3 className='mt-4 text-xl font-bold'>
				«Оплата частинами» Приватбанку
			</h3>
			<p className='mt-6 mb-8 leading-7'>
				Lorem ipsum dolor sit amet consectetur. Elementum ultrices consequat aenean tellus nibh tempor eget nibh ante.
				Porttitor nullam vitae amet sagittis donec eget mi. Nisi tellus ac in nunc duis porttitor sagittis. Diam
				suscipit diam eget in nunc ultricies enim auctor.
			</p>
		</div>
		<div className='pt-7'>
			<img src={monoBank} alt=""/>
			<h3 className='mt-4 text-xl font-bold'>
				«Оплата частинами» від Монобанку
			</h3>
			<p className='mt-6 mb-8 leading-7'>
				Lorem ipsum dolor sit amet consectetur. Elementum ultrices consequat aenean tellus nibh tempor eget nibh ante.
				Porttitor nullam vitae amet sagittis donec eget mi. Nisi tellus ac in nunc duis porttitor sagittis. Diam
				suscipit diam eget in nunc ultricies enim auctor.
			</p>
		</div>
	</div>
}
