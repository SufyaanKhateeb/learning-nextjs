import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const newMeetup = () => {
	const router = useRouter();
	async function addMeetupHandler(enteredMeetup) {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetup),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		router.push("/");
	}
	return (
		<>
			<Head>
				<title>Add Meetups</title>
				<meta
					name="description"
					content="Add new meetups related to react!"
				/>
				<NewMeetupForm onAddMeetup={addMeetupHandler} />;
			</Head>
		</>
	);
};

export default newMeetup;
