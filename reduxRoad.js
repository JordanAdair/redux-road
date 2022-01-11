// The starting point of our game. The player begins on day 0 at kilometer 0 with 100 units of supplies.
const initialWagonState = {
	supplies: 100,
	distance: 0,
	days: 0,
};

/**
 * ACTIONS
 */
const travelXDays = (num) => {
	return {
		type: "travel",
		payload: num,
	};
};

const gather = {
	type: "gather",
};

const tipWagon = {
	type: "tippedWagon",
};

/**
 * REDUCERS
 */

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
			if (state.supplies - 20 * action.payload > 0) {
				return {
					...state,
					supplies: state.supplies - 20 * action.payload,
					distance: state.distance + 10 * action.payload,
					days: state.days + action.payload,
				};
			} else {
				// If the player doesn't have sufficient supplies, don't progress, return back the current state.
				return state;
			}

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

// Set initial game state
let wagon = gameReducer(undefined, {});
console.log(wagon);

// Travel for one day
wagon = gameReducer(wagon, travelXDays(1));
console.log(wagon);

// Stop to gather supplies
wagon = gameReducer(wagon, gather);
console.log(wagon);

// Try to ford a rushing river…and our wagon tips over, spilling some supplies.
wagon = gameReducer(wagon, tipWagon);
console.log(wagon);

// Travel for three more days
wagon = gameReducer(wagon, travelXDays(3));
console.log(wagon);
