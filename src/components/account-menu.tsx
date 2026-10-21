import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManageRestaurant } from '@/api/get-menaged-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { data: managedRestaurant, isLoading: isLoadingManageRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManageRestaurant,
      staleTime: Infinity,
    })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="flex items-center gap-2 select-none"
            >
              {isLoadingManageRestaurant ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                managedRestaurant?.name
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col">
              {isLoadingProfile ? (
                <div className="space-y-5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />

                  <Skeleton />
                </div>
              ) : (
                <>
                  <span>{profile?.name}</span>

                  <span className="text-muted-foreground text-xs font-normal">
                    {profile?.email}
                  </span>
                </>
              )}
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            render={<button type="button" onClick={() => signOutFn()} />}
            disabled={isSigningOut}
            className="w-full text-rose-500 dark:text-rose-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isSigningOut ? 'Saindo...' : 'Sair'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
