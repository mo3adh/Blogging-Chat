import { useState } from "react";

const PostData = async (url, body) => {
    try {
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', 
        });
        const data = await result.json();
        return data;
    } catch (error) {
        throw error;
    }
}