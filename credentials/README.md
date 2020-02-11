# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: 18.221.178.224
2. SSH username: ubuntu  
    - (Not sure what username is. Connection is `ssh -i "csc648-team01.pem" ubuntu@ec2-18-221-178-224.us-east-2.compute.amazonaws.com
`)
3. SSH password or key: "csc648-team01.pem"
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
    - IP port: 3306. Default port. 
5. Database username: admin
6. Database password: team01
7. Database name (basically the name that contains all your tables): team01
8. Instructions on how to use the above information.
    - Open up MySql Workbench. Go over to database tab and click `Connect to database`
    - Select connection method as `Standard TCP/IP over SSH`
    - SSH Hostname: `18.221.178.224`
    - SSH Username: `ubuntu`
    - SSH Password: none
    - SSH Key File: Link to downloaded pem file. `csc648-team01.pem`
    - MySQL Hostname: `127.0.0.1`
    - MySQL Server Port: `3306`
    - Username: `admin`
    - Password: `team01`

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
