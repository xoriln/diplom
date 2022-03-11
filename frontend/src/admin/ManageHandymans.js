import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getHandymans, deleteHandyman } from "./apiAdmin";

const ManageHandymans = () => {
    const [handymans, setHandymans] = useState([]);

    const { user, token } = isAuthenticated();

    const loadHandymans = () => {
        getHandymans().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHandymans(data);
            }
        });
    };

    const destroy = handymanId => {
        deleteHandyman(handymanId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadHandymans();
            }
        });
    };

    useEffect(() => {
        loadHandymans();
    }, []);

    return (
        <Layout
            title="Менеджер мастеров"
            description=""
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Всего {handymans.length} мастеров
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {handymans.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/handyman/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Редактировать
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Удалить
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageHandymans;