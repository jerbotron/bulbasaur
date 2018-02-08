#!/usr/bin/env node

"use strict";

import { Tracker } from './src/Tracker'
import { app } from './src/Webhook'

import Binance from 'binance-api-node'

const CONFIG = require("./config.json");

const client = Binance({
	apiKey: CONFIG.API_KEY,
	apiSecret: CONFIG.API_SECRET
});

const tracker = new Tracker(client);

// tracker.trackAllEth(1, 3);
tracker.trackTicker('VENBNB', 10);

app.listen(8080, () => console.log('Jerbotron webhook listening on port 8080...'));

process.on("SIGINT", () => {
	tracker.stop();
	process.exit(0);
});