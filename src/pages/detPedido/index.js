import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetPedido() {
    var { id } = useParams();

    var [message, setMessage] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3002/detPedido/" + id, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((result) => {
                console.log(result)
                if(result.data.error){
                    setMessage(result.data.error)
                }
                else { setMessage(result.data.message) }
            })
        }, [])


        return (
            <>
            <h1>{message}</h1>
            </>
        )
}

