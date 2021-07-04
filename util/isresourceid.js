export default function(id) {
    return id.match(/^[a-f0-9]{32}$/i).length > 0;
}