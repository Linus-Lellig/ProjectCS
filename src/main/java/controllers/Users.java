package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("users/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)
public class Users {
    @GET
    @Path("list")
    public String UsersList() {
        System.out.println("Invoked Users.UsersList()");
        JSONArray response = new JSONArray();
        try {//Try statement so the code does not break in case something goes wrong
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserID, Name From Users");//Preparing SQL statement to read from the database
            ResultSet results = ps.executeQuery();
            while (results.next() == true) {
                JSONObject row = new JSONObject();
                row.put("UserID", results.getInt(1));//Inputting data into the HTML table
                row.put("UserName", results.getString(2));
                response.add(row);//Each loop adds a new row otherwise the table would be full
            }
            return response.toString();//UserID is an Integer so "response" needs to be converted to String form before it is sent
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());//Details on the error
            return "{\"Error\": \"Unable to list items. Error code xx.\"}";//Allows users and developers to identify where the error occurred
        }
    }

    @GET
    @Path("get/{UserID}")//Path parameter as "UserID" to fetch the data corresponding with the "UserID" from "DB_Project.db"
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String GetUser(@PathParam("UserID") Integer UserID) {
        System.out.println("Invoked Users.GetUser() with UserID " + UserID);
        try {//Try statement throws an error in case it does not work instead of breaking the program
            PreparedStatement ps = Main.db.prepareStatement("SELECT Name, SessionToken FROM Users WHERE UserID = ?");//Preparing SQL statement to read from the database
            ps.setInt(1, UserID);//set "?" to whatever the input was(e.g. 1), so the SQL statement would read "SELECT Name, SessionToken FROM Users WHERE User = 1"
            ResultSet results = ps.executeQuery();//results is equal to whatever the SQL query returns
            JSONObject response = new JSONObject();
            if (results.next()== true) {
                response.put("UserID", UserID);//add "UserID" from "Users" table where UserID = 1
                response.put("UserName", results.getString(1));//add "Name"(which is renamed as "UserName") from "Users" table where UserID = 1
                //Technically it looks for the value in the first column (when columnIndex=1) that matches the record with UserID = 1 and assigns the value to "UserName"
                response.put("Token", results.getInt(2));//add "SessionToken"(which is renamed as "Token") from "Users" table where UserID = 1
            }
            return response.toString();//Send response
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());//Details of the error
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";//Helpful error message
        }
    }

    @POST
    @Path("add")
    public String UsersAdd(@FormDataParam("UserID") Integer UserID, @FormDataParam("Name") String Name) {
        System.out.println("Invoked Users.UsersAdd()");
        try {
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Users (UserID, Name, ValidatedDate, Admin) VALUES (?, ?, ?, ?)");//Preparing SQL statement to read from the database
            ps.setInt(1, UserID);
            ps.setString(2, Name);
            ps.setString(3, "date");
            ps.setBoolean(4, true);
            ps.execute();
            return "{\"OK\": \"Added user.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());//Details of the error
            return "{\"Error\": \"Unable to create new item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("delete/{UserID}")
    public String DeleteUser(@PathParam("UserID") Integer UserID) throws Exception {
        System.out.println("Invoked Users.DeleteUser()");
        if (UserID == null) {//if the User does not exist don't go any further
            throw new Exception("UserID is missing in the HTTP request's URL.");
        }
        try {
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Users WHERE UserID = ?");//Preparing SQL statement to read from the database
            ps.setInt(1, UserID);
            ps.execute();
            return "{\"OK\": \"User deleted\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());//Details on the error
            return "{\"Error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }
}