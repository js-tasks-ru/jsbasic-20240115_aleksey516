function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  for(let friend of friends) {
    const li = document.createElement('li');
    li.textContent = friend.firstName + ' ' + friend.lastName;
    ul.append(li);
  }
  return ul;
}
