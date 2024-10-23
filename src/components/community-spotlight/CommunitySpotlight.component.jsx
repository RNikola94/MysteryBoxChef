import { useState, useEffect } from 'react';
import './community-spotlight.styles.css';

const topContributors = [
  { id: 1, name: 'Chef Emma', avatar: 'https://via.placeholder.com/100?text=Emma', recipesCount: 45 },
  { id: 2, name: 'Chef Carlos', avatar: 'https://via.placeholder.com/100?text=Carlos', recipesCount: 30 },
  { id: 3, name: 'Chef Marie', avatar: 'https://via.placeholder.com/100?text=Marie', recipesCount: 25 },
];

const recentActivity = [
  { id: 1, type: 'Recipe', description: 'New recipe uploaded: Spaghetti Carbonara by Chef Emma' },
  { id: 2, type: 'Discussion', description: 'New discussion started: "What’s your go-to comfort food?"' },
  { id: 3, type: 'Comment', description: 'Top comment: "This recipe was amazing!" by Chef Marie' },
  { id: 4, type: 'Recipe', description: 'New recipe uploaded: Tacos al Pastor by Chef Carlos' },
];

const CommunitySpotlight = () => {
  const [contributors, setContributors] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    setContributors(topContributors);
    setActivity(recentActivity);
  }, []);

  return (
    <section className="community-spotlight">
      <div className="top-contributors">
        <h2>Top Chefs/Contributors</h2>
        <div className="contributors-grid">
          {contributors.map((contributor) => (
            <div key={contributor.id} className="contributor-card">
              <img src={contributor.avatar} alt={contributor.name} />
              <h3>{contributor.name}</h3>
              <p>{contributor.recipesCount} recipes</p>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Community Activity</h2>
        <ul>
          {activity.map((item) => (
            <li key={item.id} className={`activity-item ${item.type.toLowerCase()}`}>
              <span className="activity-type">{item.type}</span>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CommunitySpotlight;
