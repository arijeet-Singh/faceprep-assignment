import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Redirect } from "react-router-dom";

export default function Scroll() {
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [logOut, setLogOut] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios({
      method: "GET",
      url: "https://randomuser.me/api/?results=5",
    }).then((res) => {
      setDataSource(dataSource.concat(res.data.results));
    });
  };
  const fetchMoreData = () => {
    if (dataSource.length < 500) {
      setTimeout(() => {
        getUsers();
      }, 1000);
    } else {
      setHasMore(false);
    }
  };
  const handleLogOut = () => {
    setLogOut(true);
  };
  return (
    <div className="Scroll">
      {!logOut && (
        <>
          <div
            className="heading"
            style={{ textAlign: "center", fontSize: 40 }}
          >
            <h1>Contact List</h1>
          </div>
          <div className="btn-container">
            <button
              className="heading-btn"
              style={{ textAlign: "center", fontSize: 20, cursor: "pointer" }}
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
          <div
            id="parentScrollDiv"
            className="scroll-div"
            style={{ height: 500, overflow: "auto" }}
          >
            <InfiniteScroll
              dataLength={dataSource.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="animation">
                  <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              }
              endMessage={<p style={{ textAlign: "center" }}> End of List.</p>}
              scrollableTarget="parentScrollDiv"
            >
              {dataSource.length>=1 &&
                dataSource.map((item, index) => {
                  return (
                    <div className="info" key={index}>
                      <img
                        src={item.picture.medium}
                        alt="profile-picture"
                        className="thumbnail"
                      />
                      <p className="name">
                        {item.name.title +
                          " " +
                          item.name.first +
                          " " +
                          item.name.last}
                      </p>
                    </div>
                  );
                })}
            </InfiniteScroll>
          </div>
        </>
      )}
      {logOut && <Redirect to="/" />}
    </div>
  );
}
