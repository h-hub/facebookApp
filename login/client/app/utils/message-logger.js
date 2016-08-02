/**
 * Created by harsha.kj89@gmail.com on 8/2/2016.
 */
angular.module('login.utils').service('MessageLogger', function ($http) {

    this.logError = function (exception) {
        console.log('log error');
        try {
            angular.extend(exception, {
                logtype: 'error',
                logtime: new Date(),
                workflow: 'login'
            });

            return $http.post('/log/error', exception);
        } catch (e) {
            return;
        }
    };

    this.logInstrumentation = function (info) {
        try {
            angular.extend(info, {
                logtype: 'info',
                logtime: new Date(),
                workflow: 'login'
            });

            return $http.post('/log/instrumentation', info);
        } catch (e) {
            return;
        }
    };

    this.services = {
        getNewCourseMaterials: 'getNewCourseMaterials',
        getCourseMaterials: 'getCourseMaterials',
        getMyCourses: 'getMyCourses',
        getCoursesByCourseId: 'getCoursesByCourseId',
        getCourseMaterialById: 'getCourseMaterialById',
        getAllDisciplines: 'getAllDisciplines',
        saveCourses: 'saveCourses',
        deleteCourse: 'deleteCourse',
        getServerDate: 'getServerDate'
    }

    this.actions = {
        searchCourses: 'search-courses',
        searchMaterials: 'search-materials',
        enterCourseIdSearch: 'course-id-search',
        enterMaterialsSearch: 'catelog-search',
        myCourseList: 'see-my-list',
        selectCourse: 'select-course',
        selectMaterial: 'select-material',
        selectEdition: 'select-edition',
        selectVersion: 'select-version',
        createCourse: 'create-course',
        selectCurrentEdition: 'Current Edition Selected',
        selectCurrentVersion: 'Current Version Selected',
        selectNewEdition: 'New Edition Selected',
        selectNewVersion: 'New Version Selected',
        updatePanelCount: 'Update panel count',
        cancelCourseCreation: 'select-cancel-course-creation',
        createCopyCourse: 'select-create-copy-course',
        goToCatalog: 'select-go-to-catalog',
        returnToMyCourse: 'return to my course',
        createAnotherCourse: 'Create another course',
        bookStoreInfo: 'Bookstore information selected',
        exitToCourseHome: 'Exit to course home',
        selectCourseStartDate: 'Course start date selected',
        selectCourseEndDate: 'Course end date selected',
        selectEnrollmentStartDate: 'Enrollment start date selected',
        selectEnrollmentEndDate: 'Enrollment end date selected',
        selectCourseStartDateManually: 'Course start date manually selected',
        setCourseListArray: 'Created course id list'
    };

    this.ui = {
        createCourse: 'create-a-course',
        selectCourseMaterials: 'select-course-materials',
        selectExistingCourse: 'select-existing-course',
        enterCourseDetails: 'enter-course-details',
        youAredone: 'you-are-done',
        intermediateProvider: 'intermediate-page'
    }

});