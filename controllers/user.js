//// just to test

class User{
    // user methods
    searchUsers(keyword){
        const users = [
            {
                "id" : 1,
                "name" : "Avishka",
                "username" : "Avishka",
                "password" : "Avishka@98"
            },
            {
                "id" : 2,
                "name" : "Irosha",
                "username" : "Irosha",
                "password" : "Irosha@97"
            },
            {
                "id" : 3,
                "name" : "Isuru",
                "username" : "Isuru",
                "password" : "Isuru@98"
            },
            {
                "id" : 4,
                "name" : "Sahan",
                "username" : "Sahan",
                "password" : "Sahan@98"
            },
            {
                "id" : 5,
                "name" : "Nandana",
                "username" : "Nandana",
                "password" : "Nandana@98"
            }
        ];

        return users;
    }

    viewProfile(userID){
        const user = [
            {
                "id" : 1,
                "name" : "Avishka",
                "username" : "Avishka",
                "password" : "Avishka@98"
            }
        ];
        return user;
    }

    deleteAccount(){
        return true;
    }

    addSkill(name){
        return true;
    }

    removeSkill(skillID){
        return true;
    }

    validateSkill(skillID){
        return true;
    }

    addConnection(userID){
        return true;
    }

    respondConnection(connectionID,accept){
        return true;
    }

    removeConnection(userID){
        return true;
    }

    submitRecommendation(userID, description){
        return true;
    }

    changePassword(oldPass, newPass){
        return true;
    }

    editProfile(information){
        return true;
    }

    // user event methods
    searchEvents(keyword){
        const events = [
            {
                "id" : 1,
                "name" : "event 1"
            },
            {
                "id" : 2,
                "name" : "event 2"
            }
        ];

        return events;
    }

    viewEvent(userID){
        const event = [
            {
                "id" : 1,
                "name" : "event1"
            }
        ];
        return event;
    }

    joinEvent(eventID){
        return true;
    }

    leaveEvent(eventID){
        return true;
    }

    updateEvent(eventID, information){
        return true;
    }

    deleteEvent(eventID){
        return true;
    }

    // user event membership methods
    updateRole(membershipID, role){
        return true;
    }

    acceptEventRequest(membershipID){
        return true;
    }
}

module.exports = User;