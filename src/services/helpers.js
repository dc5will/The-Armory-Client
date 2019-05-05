const helpers = {
  findPartyIndex(partyId, parties) {
    let index = -1;
    for (let i = 0; i < parties.length; i++) {
      if (parties[i].id === partyId) {
        index = i;
        break;
      }
    }
    return index;
  },
}

export default helpers;