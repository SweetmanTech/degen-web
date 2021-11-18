import {
	GetServerSidePropsContext, GetServerSidePropsResult,
	NextPage,
} from 'next';
import platformTypes from '../../constants/platformTypes';
import MongoDBUtils from '../../utils/MongoDBUtils';
import { Collection, Db, ObjectId } from 'mongodb';
import constants from '../../constants/constants';
import { getSession, signIn, useSession } from 'next-auth/client';
import TwitterAuth, { TwitterAuthentication } from '../../utils/TwitterAuth';
import apiKeys from '../../constants/apiKeys';
import Cookies from 'cookies';
import cookieKeys from '../../constants/cookieKeys';

const Platform: NextPage<any> = () => {
	const [session, loading] = useSession();
	if (loading) {
		return (
			<>loading...</>
		);
	}
	if (!session || !session.isDiscordLinked) {
		signIn('discord').then();
		return (
			<></>
		);
	}
	return (
		<>
			Twitter account linked. You are now authorized to host POAP events for twitter spaces!
		</>
	);
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
	const session = await getSession(context);
	const platform = context.params?.platform;

	if (platform !== platformTypes.TWITTER) {
		return {
			props: {},
		};
	}
	
	// Verify discord session is active
	if (!session) {
		return {
			props: {},
		};
	}
	
	if (!(await TwitterAuth.isTwitterLinked(session.user.id))) {
		
		const cookies = new Cookies(context.req, context.res, { keys: [constants.SECRET_KEY] });
		cookies.set(cookieKeys.redirectPath, '/verification/twitter');
		
		const twitterAuth: TwitterAuthentication = await TwitterAuth.authLink();
		return {
			redirect: {
				destination: twitterAuth.url,
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};


export default Platform;