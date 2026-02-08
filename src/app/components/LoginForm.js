import React from "react";
import { memo } from "react";

const LoginForm = (props) => {
    return (
        <>
            <form onSubmit={props.switchForm ? props.signInFormData :props.signUpFormData} className="my-5 max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-5">

                <div className="d-flex justify-content-center gap-3">
                    <h5 className={`text-2xl font-semibold text-gray-800 text-center border py-2 px-4 ${props.switchForm ? 'activeForm bg-dark-subtle' : ''}`} onClick={()=> props.setSwitchForm(true)}>Sign IN</h5>
                    <h5 className={`text-2xl font-semibold text-gray-800 text-center border py-2 px-4 ${!props.switchForm ? 'activeForm bg-dark-subtle' : ''}`} onClick={()=> props.setSwitchForm(false)}>Sign Up</h5>
                    
                </div>

                {props.success && (
                    <div className="text-green-600 text-center font-medium bg-green-50 border border-green-200 rounded-lg py-2 transition-opacity duration-500">
                    ✅ Message sent successfully!
                    </div>
                )}
                {
                    props.switchForm ? (
                    <>
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={props.signIn.email}
                            onChange={props.handleChangesignIn}
                            placeholder="Enter your email"
                            
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {props.errors.email && <p className="error text-danger"><small>{props.errors.email}</small></p>}
                        </div>
                        <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={props.signIn.password}
                            onChange={props.handleChangesignIn}
                            placeholder="Password"
                            
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {props.errors.password && <p className="error text-danger"><small>{props.errors.password}</small></p>}
                        </div>
                    </>
                    ) : (
                    <>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                        </label>
                        <input
                        type="text"
                        id="name"
                        name="username"
                        value={props.form.username}
                        onChange={props.handleChange}
                        placeholder="Enter your name"
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {props.errors.username && <p className="error text-danger"><small>{props.errors.username}</small></p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="emailSignup" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                        </label>
                        <input
                        type="email"
                        id="emailSignup"
                        name="email"
                        value={props.form.email}
                        onChange={props.handleChange}
                        placeholder="Enter your email"
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {props.errors.email && <p className="error text-danger"><small>{props.errors.email}</small></p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={props.form.password}
                        onChange={props.handleChange}
                        placeholder="Password"
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {props.errors.password && <p className="error text-danger"><small>{props.errors.password}</small></p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={props.form.confirmPassword}
                        onChange={props.handleChange}
                        placeholder="Confirm Password"
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {props.errors.confirmPassword && (
                        <p className="error text-danger"><small>{props.errors.confirmPassword}</small></p>
                    )}
                    </div>
                    </>
                    )
                }
                
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    {props.switchForm ? 'Sign In' : 'Sign Up'}
                </button>

            </form>
        </>
    )
}

export default memo(LoginForm)