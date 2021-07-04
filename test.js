import Client from './index.js'

const client = new Client({
    key: "87682f6ddea25f949cefa46777c82c28295a6",
    email: "albin.hedwall07@utb.ostragoinge.se",
    userid: "9fe9cccf3008d3e046e669d0d29417c0"
});

client.zones.list({useCache: true}).then(r => {
    console.time('one')
    client.zones.get("e435c5c26d5f650e1e56d58ea6c8df70").then(r => {
        console.timeEnd("one")
        console.time("two")
        client.zones.get("e435c5c26d5f650e1e56d58ea6c8df70").then(r => {
            console.timeEnd("two");
        });
    });
})