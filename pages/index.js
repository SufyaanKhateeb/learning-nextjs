import { MongoClient } from "mongodb";

import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
	{
		id: 1,
		title: "New York",
		image:
			"https://images.unsplash.com/photo-1496588152823-86ff7695e68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
		address: "Some place",
		description: "Bridge",
	},
	{
		id: 2,
		title: "New York",
		image:
			"https://images.unsplash.com/photo-1496588152823-86ff7695e68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
		address: "Some place",
		description: "Bridge",
	},
];
export default function Home(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Browse a huge list of highly active react meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	// fetch data from API
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		}
// 	};
// }

export async function getStaticProps() {
	// fetch data from API
	const client = await MongoClient.connect(
		"mongodb+srv://sufyaankhateeb:kOgueYqrrtnGSOCb@nextjs-meetup-app.hcwmspv.mongodb.net/meetups?retryWrites=true&w=majority"
	);

	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => {
				return {
					title: meetup.title,
					address: meetup.address,
					image: meetup.image,
					id: meetup._id.toString(),
				};
			}),
		},
		revalidate: 100,
	};
}
