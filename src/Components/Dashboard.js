import React from 'react';

export default function Dashboard() {

  const staticData = [
    {title:'Overwatch', tags:['FPS', 'Team-based', 'Hero-shooter'], AvailParties:31, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'FFXIV', tags:['MMORPG'], AvailParties:26, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'League of Legends', tags:['MOBA', 'Team-based', 'Strategy'], AvailParties:78, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'Apex Legends', tags:['FPS', 'Battle Royale', 'Team-based', 'Hero-shooter'], AvailParties:49, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'CSGO', tags:['FPS', 'Team-based'], AvailParties:13, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'DOTA 2', tags:['MOBA', 'Strategy', 'PvP'], AvailParties:55, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'Fortnite', tags:['Third-person shooter', 'Team-based', 'Battle Royale'], AvailParties:3, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'},
    {title:'Rainbow Six Siege', tags:['FPS', 'Team-based', 'Hero-shooter'], AvailParties:67, img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'}
  ];

  function handleData(staticData) {
    return staticData.map((data, index) => {
      return (
        <div key={index}>
          <img src={data.img} alt="Game Cover" />
          <h3>{data.title}</h3>
          {data.tags.map((tag, i) => {
            return <span key={i}>{tag} | </span>;
          })}
        </div>
      );
    });
  }

  return <div className='dashboard-container'>
  <ul>
    {handleData(staticData)}
  </ul>
  
  </div>

}