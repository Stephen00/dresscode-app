import React, { useState, useEffect, Fragment } from "react";
import './discover-poll-page.css';
import axios from "axios";
import Card from '../../features/discover-card/discover-card'
import { IPoll } from "../../app/models/poll";

const DiscoverPollPage = () => {
    const [polls, setPolls] = useState<IPoll[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/discover/polls/")
        .then((response) => {
            setPolls(response.data);
            console.log(response.data)
        })
        .catch((Error) => {
            console.log(Error);
        });
    }, []);
    
    return (
        <div>
            {polls.map((poll: any) => ( 
                <Card title={poll.question} key={poll.pk} slug={poll.slug} date = "20/10/2020"/>
            ))}
        </div>
    )
}

export default DiscoverPollPage;