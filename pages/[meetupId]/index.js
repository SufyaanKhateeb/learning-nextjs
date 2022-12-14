import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";

const MeetupDetail = (props) => {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetails
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
};

export async function getStaticPaths() {
	if (process.env.SKIP_BUILD_STATIC_GENERATION) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	const client = await MongoClient.connect(
		"mongodb+srv://sufyaankhateeb:kOgueYqrrtnGSOCb@nextjs-meetup-app.hcwmspv.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
	console.log(meetups);
	client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map((meetup) => {
			return {
				params: {
					meetupId: meetup._id.toString(),
				},
			};
		}),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		"mongodb+srv://sufyaankhateeb:kOgueYqrrtnGSOCb@nextjs-meetup-app.hcwmspv.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");
	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});
	console.log(selectedMeetup);
	client.close();

	return {
		props: {
			meetupData: { ...selectedMeetup, _id: meetupId },
		},
	};
}

export default MeetupDetail;
