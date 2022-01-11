// The starting point of our game. The player begins on day 0 at kilometer 0 with 100 units of supplies.
const initialWagonState = {
	supplies: 100,
	distance: 0,
	days: 0,
};

// A reducer that will manage the state of the game
const gameReducer = (state = initialWagonState, action) => {
	switch (action.type) {
		// A player may gather supplies, which takes them a day and doesn’t cover any distance.
		case "gather":
			return {
				...state,
				supplies: state.supplies + 15,
				distance: state.distance,
				days: state.days + 1,
			};

		// A player may travel for any number of days, which costs 20 supplies for each day but adds 10 kilometers each day.
		case "travel":
			return {
				...state,
				supplies: state.supplies - 20,
				distance: state.distance + 10 * action.payload,
				days: state.days + action.payload,
			};

		// If a player drives off-road or across deep rivers, the wagon may tip! You’ll need to spend some supplies and a day to fix it.
		case "tippedWagon":
			return {
				...state,
				supplies: state.supplies - 30,
				distance: state.distance,
				days: state.days + 1,
			};

		default:
			return state;
	}
};
