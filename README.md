# Barebones React/TypeScript/Express/Sass Boilerplate
This project is a starting point for a TypeScript based React app that also has a local API server using express.

There are 2 different Webpack configurations. One for the server and one for the client.

## Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.

## Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.

The client configuration will also build the Sass files found at `/src/client/scss`. The `index.tsx` imports the `app.scss` file which already includes an import for Bootstrap.

## Running the project
In order to run the server, use `npm run dev`, and the server will start on port 3000 (http://localhost:3000).

Webpack will watch the files. Once you save a file, you can refresh your browser to ensure you got the updated client files. If you only change server files, you *shouldn't* need to refresh.

---

# Timeline Web App
Interactive Destiny Universe Timeline, codename Infinite Forest

### Abstract:
Rule-based order of events to allow dynamic generation of the most accurate possible timeline. Interactive and easy reference for Lore exploration.

### App:
Contains a database of rules for every entry.
1) Rulesets are compiled manually into a timeline server-side - generated timeline is saved and served to visitors
2) Users may manually unflag or flag rules to generate an experimental timeline client-side.
3) Authenticated users may create and save their own custom rules to generate a custom timeline that can be shared with others
	* note: custom url? Saved into user db? investigate.
4) Go Crazy: Guided Tour, Narrated, with Synced Spotify Playlist

### UX Goals:
* Accessible enough for new players, powerful enough for lore masters
* Useful for learning about Destiny’s events or exploring alternate interpretations
	* Events are fully explorable.  All relevant Lore entries for an event may be navigated
	* Events are filterable. Categories may be chosen to display only events relative to specific subjects, e.g., only events about Earth, or only events about the Awoken, etc. Multiple filters may be combined to create dynamic bespoke timelines
* Timeline View or Lore View - read lore in chronological order. Can save your spot.
* Functionality not dependent on Bungie Server Status
* Need to save local copy of manifest. Check local manifest version against current.
1) this will avoid making too many requests and
2) make sure the app is not dependent on the status of the API. Updates to the API need to be vetted for errors before pushing making public.
	* Authenticate users independently of Bungie login and link Bungie account?

### Proposed Structure
![Proposed Structure](/structure.jpg)

### App
* Menu
* Timeline
* Story

### Timeline Component:
* Calendar - frames of reference (dates) for events
	* Thread - main event container for a filtered category (or categories)
	* Period - period reference (golden age, city age, taken war…)

### Story Component:
* Version A, as pictured: Clicked threads/events display their lore entries here, independently scrolled.  May be paired with Timeline view for a dual-viewing experience
* Version B: a popup within the Timeline Component that displays only one clicked entry at a time.

### Event Component:
* Appearance:
	* Event Class
		* Major Event (large)
		* Minor Event (caps)
		* Standard Event (italic)
	* Event Type
		* Single
			* Custom Dot (css class?)
		* Split (indicates player choice)
		* Period (may designate start and end sub-event)
	* Relation
		* Parent of
		* Child of
		* Default State (collapsed or expanded)
	* Reference
		* Allow to search Lore entries for strings
		* Add multiple references or books
	* Categories
		* Major category
			* Flag to show icon on timeline. May be false
		* Other Categories
			* Races
			* Individuals
			* Factions
			* Locations
			* Themes
			* Curios (objects, subjects, etc, .e.g. Game of Life, Cocytus Gate, Artifact)
	* Date
		* Start/End of Period (Golden Age, Taken War, etc)
		* Reference ( Late 21st Century, etc)
	* Media Reference
		* Audio, Video, etc
	* Background Image
		* alignment
		* position (static, parallax)
* Placement
	* Automatic, Best Fit
		* Logic Rules
			* Must be [length of time] [relation] [event]
				* Time: immediately, duration __ days months years
				* Relation: before, after, concurrent with
					* If Concurrent, select parallel timeline
			* Default AND
				* OR?
			* Flag: Allow Conflicts
			* Flag: Ignore
			* Lore Reference for Rule
			* Notes for Rules
		* Default Ruleset enabled per event
		* Create New Rule
			* Save Rule (Admins Only)
			* Submit Rule for Review (Authenticated Users only)
	* Manual
		* Maintains position relative to neighbor Events, e.g., 2 units above X event

### Notes
* Saving Rules must also save a dependency reference to the Events named in the rulesets.  e.g., creating a rule in Reef Wars that it must be parallel to Twilight Gap must save a callback to the Reef Wars under the TG event. This will aid in data integrity, as deleting an event must also delete or disable any rule that contains a reference to it.
* Need to be able to pair/marry threads, calendar, period, and entries placements. Changing the placement of one must change the placement of connected components
