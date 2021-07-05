export default function(array, id) {
    array.filter(item => {
        return item.id === id;
    })
    return array;
}