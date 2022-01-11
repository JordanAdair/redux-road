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
				days: state.days + 1,
			};

		default:
			return state;
	}
};
