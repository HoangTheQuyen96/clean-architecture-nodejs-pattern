pipeline {
     agent any
     triggers {
          pollSCM('* * * * *')
     }
     stages {
          stage("Compile") {
               steps {
                    sh "./bootstrap.sh"
               }
          }
          stage("Unit test") {
               steps {
                    sh "npm install"
                    sh "npm run test-coverage"
               }
          }
     }
}