import { setContext } from 'svelte';
import { get, writable } from 'svelte/store';

const stateData = {};

const eventStore = writable();

function initalizeEventStore() {
    let eventData = {}
    eventStore.set(eventData);

    setContext('eventStore', eventStore);
}

function updateEvent(event) {
    eventStore.set(event);
}

export {initalizeEventStore, eventStore, updateEvent}