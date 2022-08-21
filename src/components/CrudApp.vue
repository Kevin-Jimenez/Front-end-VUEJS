<template>
    <div class="container" style="margin: 0 auto; width: 80%">
        <Panel header="CRUD" style="text-align:center;">
            <Menubar :model="items" />
            <br>
            <DataTable :value="personas" :paginator="true" :rows="10" v-model:selection="selectionPerson"
                selectionMode="single" dataKey="id">
                <Column field="id" header="#"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="last_name" header="Last Name"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="address" header="Address"></Column>
            </DataTable>
        </Panel>
        <!--Modal-->
        <Dialog header="New Person" :visible="displayModal" :style="{ width: '60vw' }" :modal="true">
            <span class="p-float-label">
                <InputText id="name" type="text" v-model="persona.name" style="width: 100%" />
                <label for="name">Name</label>
            </span>
            <br>
            <span class="p-float-label">
                <InputText id="last_name" type="text" v-model="persona.last_name" style="width: 100%" />
                <label for="last_name">Last Name</label>
            </span>
            <br>
            <span class="p-float-label">
                <InputText id="address" type="text" v-model="persona.address" style="width: 100%" />
                <label for="address">Address</label>
            </span>
            <br>
            <span class="p-float-label">
                <InputText id="phone" type="text" v-model="persona.phone" style="width: 100%" />
                <label for="phone">Phone</label>
            </span>
            <template #footer>
                <Button label="Save" icon="pi pi-check" @click="save" class="p-button-success" />
                <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-danger" />
            </template>
        </Dialog>
        <Dialog header="Person Add" :visible="alertsuccess" :style="{ width: '30vw' }" :modal="true">
            <h1>User Add Successfully</h1>
            <template #footer>
                <Button label="OK" icon="pi pi-check" @click="closeAlert" class="p-button-success" />
            </template>
        </Dialog>
        <!--Success-->
        
    </div>
</template>

<script>

import PersonaService from '@/service/PersonaService';
export default {
    name: 'CrudApp',
    data() {
        return {
            //message = null,
            //mostrar datos
            personas: null,
            //agregar
            persona: {
                id: null,
                name: null,
                last_name: null,
                phone: null,
                address: null,
            },
            //Seleccionar campo de la tabla
            selectionPerson: {
                id: null,
                name: null,
                last_name: null,
                phone: null,
                address: null,
            },
            //items del menu bar 
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        this.showModal();
                    }
                }, {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    command: () => {
                        this.edit();
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash',
                    command: () => {
                        this.delete();
                    }
                },
                {
                    label: 'Refresh',
                    icon: 'pi pi-fw pi-refresh',
                    command: () => {
                        this.getAll();
                    }
                }
            ],
            displayModal: false,
            alertsuccess : false
        }
    },
    //se guardan las personal mostrarla
    personaService: null,
    //se crea el componente
    created() {
        this.personaService = new PersonaService();
    },
    //montar el componenete
    mounted() {
        //mostramos el metodo getAll
        this.getAll();
    },
    //metodos
    methods: {
        //agregar
        save() {
            this.personaService.save(this.persona).then(data => {
                //si el estatus es correcto
                if (data.status === 200) {
                    //cierra modal
                    this.displayModal = false;
                    //limpia los campos
                    this.persona = {
                        id: null,
                        name: null,
                        last_name: null,
                        phone: null,
                        address: null,
                    },
                    this.showAlertSuccess();
                    //retorna la tabal
                    this.getAll();
                }
            })
        },
        //obtener registros
        getAll() {
            this.personaService.getAll().then(data => {
                this.personas = data.data;
                console.log(data);
            });
        },
        //editar
        edit() {
            this.persona = this.selectionPerson;
            this.displayModal = true;
        },
        delete() {
            if (confirm("Are you sure delete this record?")) {
                this.personaService.delete(this.selectionPerson.id).then(data => {
                    if (data.status === 200) {
                        this.getAll();
                    } 
                });
            }
        },
        //mostrar modal
        showModal() {
            this.displayModal = true;
        },
        //cerrar modal
        closeModal() {
            this.displayModal = false;
        },
        showAlertSuccess(){
            this.alertsuccess = true;
        },
        closeAlert(){
            this.alertsuccess = false;
        }
    }
}

</script>



<style>
</style>