export const validate = {
    password(value) {
        var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        return re.test(value);
    },
    email(value) {
        var re = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        return value.matches(re);
    },
    name(value) {
        if (value.length < 4)
            return true;
        else
            return false;
    }
}