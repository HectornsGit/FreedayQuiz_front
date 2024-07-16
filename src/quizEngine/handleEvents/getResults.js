const getResults = (socket, setClickedResponses) => {
    if (socket) {
        socket.on('results', (hitsResults) => {
            setClickedResponses(hitsResults);
        });
    }
};
export default getResults;
