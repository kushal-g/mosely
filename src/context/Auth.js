import React, { useState, useEffect } from 'react';
import app from '../utils/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		app.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);
	return <AuthContext.Provider value={{ currentUser, loading }}>{children}</AuthContext.Provider>;
};
