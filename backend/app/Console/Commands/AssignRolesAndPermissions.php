<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AssignRolesAndPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'roles_perms:assign';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign roles and permissions to users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $basePerms = $this->argument('basePerms');

        try {
            //$user = User::query()->where("email","=", $email)->firstOrFail();
             $roleAdmin = Role::where('name', "=", 'admin')->where('guard_name', '=', 'web')->first();
             $roleAdminApi = Role::where('name', "=", 'admin')->where('guard_name', '=', 'api')->first();

            if ($roleAdmin) {
                $checkPerms = Permission::where('name', "LIKE", "%$basePerms%")->where('guard_name', '=', 'api')->first(
                );

                if (!$checkPerms) {
                    $permissions = [
                        [
                            //'group_name' => 'role',
                            'permissions' => [
                                // role Permissions
                                $basePerms . '.create',
                                $basePerms . '.view',
                                $basePerms . '.update',
                                $basePerms . '.delete',
                                $basePerms . '.forceDelete',
                                $basePerms . '.approve',
                                $basePerms . '.restore',
                                $basePerms . '.review',
                            ]
                        ],
                    ];

                    // Create and Assign Permissions
                    for ($i = 0; $i < count($permissions); $i++) {
                        //    $permissionGroup = $permissions[$i]['group_name'];
                        for ($j = 0; $j < count($permissions[$i]['permissions']); $j++) {
                            // Create Permission
                            $permission = Permission::create([
                                                                 'name' => $permissions[$i]['permissions'][$j],
                                                                 'guard_name' => 'web'
                                                             ]);
                            $roleAdmin->givePermissionTo($permission);

                            $permission->assignRole($roleAdmin);

                            $permission = Permission::create([
                                                                 'name' => $permissions[$i]['permissions'][$j],
                                                                 'guard_name' => 'api'
                                                             ]);
                            //$roleSuperAdmin->givePermissionTo($permission);
                            $roleAdminApi->givePermissionTo($permission);
                            $permission->assignRole($roleAdminApi);
                        }
                    }
                    $this->info("[Admin] role has been assigned permissions for feature ($basePerms)");
                } else {
                    $this->warn("It seems that permissions for [$basePerms] already exists ");
                }
            }
        } catch (\Throwable $exception) {
            \Log::error($exception);
            $this->error($exception->getMessage());
        }
    }
}
