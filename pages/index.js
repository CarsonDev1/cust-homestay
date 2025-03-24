import Banner from '@/components/Banner';
import Explore from '@/components/Explore';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Hosting from '@/components/Hosting';
import MediumCards from '@/components/MediumCards';
import LargeCards from '@/components/LargeCards';
import { live, discover } from '../data';
import MainLayout from './layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AmenityList from '@/components/AmenityList';
import VoucherCard from '@/components/VoucherCard';

export default function Home() {
	const { t } = useTranslation('common');

	return (
		<MainLayout>
			<main>
				<Hero />
				<MediumCards />
				<VoucherCard />
				<AmenityList />
				<Explore />
				<Banner />
			</main>
		</MainLayout>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'home'])),
		},
	};
}
