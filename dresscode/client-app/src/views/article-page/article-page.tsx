import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { IArticle } from "../../app/models/article";
import Picture from "../../assets/shutterstock_256173265_edit.jpg"
import './article-page.css';

const ArticlePage = () => {
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/discover/articles/")
                .then((response) => {
                    setArticles(response.data);
                })
                .catch((Error) => {
                    console.log(Error);
                });
    }, []);

    return (
        <div>
            <h1>Article Page</h1>
            <div className="container">
                {articles.map((article: any) => (
                    <div className="card" style={{borderColor: "#74529E"}} key={article.pk} >
                        <div className="card-body">
                            <h5 className="text" style={{textAlign: "right"}}>21/10/2020</h5>
                            <h3 className="card-title text">{article.title}</h3>
                            <div className="image-section">
                                <img src={Picture} alt="no picture found" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4" style={{textAlign: "center"}}>
                                <span  style={{color: "#74529E"}}>
                                    <i className="far fa-heart fa-2x">
                                        <span>264</span>
                                    </i>
                                </span>
                            </div>
                            <div className="col-4" style={{textAlign: "center"}}>
                                <span  style={{color: "#74529E"}}>
                                    <i className="far fa-star fa-2x">
                                        <span>25</span>
                                    </i>
                                </span>
                            </div>
                            <div className="col-4" style={{textAlign: "center"}}>
                                <span  style={{color: "#74529E"}}>
                                    <i className="far fa-share-square fa-2x">
                                        <span>4</span>
                                    </i>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticlePage;