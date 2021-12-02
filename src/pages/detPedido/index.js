import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetPedido() {
    var { id } = useParams();

    var [message, setMessage] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3002/requestDetails/" + id, {
                headers: {  
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((result) => {
                console.log(result)
                if(result.data.status === "error"){
                    setMessage(result.data.message)
                }
                else { setMessage(result.data.message) }
            })
        }, [id])

        return (
            <>
            <h1>{message}</h1>
            </>
        )
}

